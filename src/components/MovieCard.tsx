import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string[];
  poster: string;
  isFavorite: boolean;
  views: number;
  description?: string;
  director?: string;
  cast?: string[];
  duration?: number;
  country?: string;
  trailer?: string;
}

interface MovieCardProps {
  movie: Movie;
  onToggleFavorite: (id: number) => void;
  onClick: (movie: Movie) => void;
}

export function MovieCard({ movie, onToggleFavorite, onClick }: MovieCardProps) {
  return (
    <Card 
      className="glass-card hover-glow group overflow-hidden cursor-pointer animate-scale-in"
      onClick={() => onClick(movie)}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[2/3] bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <span className="text-8xl">{movie.poster}</span>
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(movie.id);
            }}
          >
            <Icon name={movie.isFavorite ? "Heart" : "Heart"} className={movie.isFavorite ? "fill-red-500 text-red-500" : ""} size={20} />
          </Button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/80 to-transparent p-4">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className="bg-primary/20 text-primary-foreground">
                ⭐ {movie.rating}
              </Badge>
              <Badge variant="outline" className="text-xs">{movie.year}</Badge>
            </div>
            <h3 className="font-heading font-semibold text-lg mb-1 line-clamp-2">{movie.title}</h3>
            <div className="flex flex-wrap gap-1">
              {movie.genre.map(g => (
                <Badge key={g} variant="outline" className="text-xs">{g}</Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
