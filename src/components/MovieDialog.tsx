import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import type { Movie } from './MovieCard';

interface Review {
  id: number;
  movieId: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface MovieDialogProps {
  movie: Movie | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onToggleFavorite: (id: number) => void;
  reviews: Review[];
}

export function MovieDialog({ movie, isOpen, onOpenChange, onToggleFavorite, reviews }: MovieDialogProps) {
  if (!movie) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <ScrollArea className="h-full max-h-[90vh]">
          <div className="relative">
            <div className="relative h-64 bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
              <span className="text-9xl">{movie.poster}</span>
              <div className="absolute top-4 right-4">
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-background/80 backdrop-blur-sm hover:bg-background"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(movie.id);
                  }}
                >
                  <Icon 
                    name="Heart" 
                    className={movie.isFavorite ? "fill-red-500 text-red-500" : ""} 
                    size={24} 
                  />
                </Button>
              </div>
            </div>

            <div className="p-8">
              <DialogHeader className="mb-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <DialogTitle className="text-4xl font-heading font-bold gradient-text">
                    {movie.title}
                  </DialogTitle>
                  <Badge className="bg-primary/20 text-2xl px-4 py-2">
                    ⭐ {movie.rating}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge variant="outline" className="text-sm">{movie.year}</Badge>
                  {movie.duration && (
                    <Badge variant="outline" className="text-sm">
                      <Icon name="Clock" size={14} className="mr-1" />
                      {movie.duration} мин
                    </Badge>
                  )}
                  {movie.country && (
                    <Badge variant="outline" className="text-sm">
                      <Icon name="MapPin" size={14} className="mr-1" />
                      {movie.country}
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {movie.genre.map(g => (
                    <Badge key={g} className="bg-primary/10 text-primary-foreground">{g}</Badge>
                  ))}
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {movie.description && (
                  <div>
                    <h3 className="font-heading font-semibold text-xl mb-3 flex items-center gap-2">
                      <Icon name="FileText" size={20} className="text-primary" />
                      Описание
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {movie.description}
                    </p>
                  </div>
                )}

                {movie.director && (
                  <div>
                    <h3 className="font-heading font-semibold text-xl mb-3 flex items-center gap-2">
                      <Icon name="Clapperboard" size={20} className="text-primary" />
                      Режиссёр
                    </h3>
                    <p className="text-foreground">{movie.director}</p>
                  </div>
                )}

                {movie.cast && movie.cast.length > 0 && (
                  <div>
                    <h3 className="font-heading font-semibold text-xl mb-3 flex items-center gap-2">
                      <Icon name="Users" size={20} className="text-primary" />
                      В главных ролях
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.cast.map((actor, idx) => (
                        <Badge key={idx} variant="secondary" className="text-sm">
                          {actor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-6 border-t border-border">
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      size="lg" 
                      className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    >
                      <Icon name="Play" className="mr-2" size={20} />
                      Смотреть
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      onClick={() => onToggleFavorite(movie.id)}
                    >
                      <Icon 
                        name="Heart" 
                        className={movie.isFavorite ? "fill-red-500 text-red-500 mr-2" : "mr-2"} 
                        size={20} 
                      />
                      {movie.isFavorite ? 'В избранном' : 'В избранное'}
                    </Button>
                    <Button size="lg" variant="outline">
                      <Icon name="Share2" className="mr-2" size={20} />
                      Поделиться
                    </Button>
                  </div>
                </div>

                <Card className="glass-card mt-6">
                  <CardContent className="p-6">
                    <h3 className="font-heading font-semibold text-lg mb-4">Рецензии зрителей</h3>
                    <div className="space-y-4">
                      {reviews.filter(r => r.movieId === movie.id).map(review => (
                        <div key={review.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{review.author}</span>
                            <Badge variant="secondary">⭐ {review.rating}/10</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{review.date}</p>
                          <p className="text-foreground">{review.text}</p>
                        </div>
                      ))}
                      {reviews.filter(r => r.movieId === movie.id).length === 0 && (
                        <p className="text-muted-foreground text-center py-4">
                          Пока нет рецензий на этот фильм
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
