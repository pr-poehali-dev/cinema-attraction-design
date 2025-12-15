import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string[];
  poster: string;
  isFavorite: boolean;
  views: number;
}

const GENRES = ['Все', 'Боевик', 'Драма', 'Комедия', 'Фантастика', 'Триллер', 'Мелодрама'];

const MOCK_MOVIES: Movie[] = [
  { id: 1, title: 'Космическая одиссея', year: 2024, rating: 8.9, genre: ['Фантастика', 'Драма'], poster: '🚀', isFavorite: true, views: 5 },
  { id: 2, title: 'Ночной город', year: 2023, rating: 8.5, genre: ['Боевик', 'Триллер'], poster: '🌃', isFavorite: false, views: 3 },
  { id: 3, title: 'Последний рубеж', year: 2024, rating: 9.1, genre: ['Боевик', 'Фантастика'], poster: '⚔️', isFavorite: true, views: 7 },
  { id: 4, title: 'Тайны прошлого', year: 2023, rating: 7.8, genre: ['Драма', 'Триллер'], poster: '🔍', isFavorite: false, views: 2 },
  { id: 5, title: 'Смешная история', year: 2024, rating: 7.2, genre: ['Комедия'], poster: '😂', isFavorite: false, views: 1 },
  { id: 6, title: 'Сердца в огне', year: 2023, rating: 8.0, genre: ['Мелодрама', 'Драма'], poster: '💖', isFavorite: true, views: 4 },
  { id: 7, title: 'Параллельные миры', year: 2024, rating: 8.7, genre: ['Фантастика'], poster: '🌌', isFavorite: false, views: 6 },
  { id: 8, title: 'Охотник', year: 2023, rating: 8.3, genre: ['Боевик', 'Триллер'], poster: '🎯', isFavorite: false, views: 2 },
];

const REVIEWS = [
  { id: 1, movieId: 1, author: 'Алексей К.', rating: 9, text: 'Потрясающая визуализация! Каждый кадр — произведение искусства.', date: '2024-12-10' },
  { id: 2, movieId: 3, author: 'Мария С.', rating: 10, text: 'Лучший боевик года. Динамика на высшем уровне!', date: '2024-12-12' },
  { id: 3, movieId: 7, author: 'Дмитрий В.', rating: 8, text: 'Интересная концепция параллельных вселенных. Рекомендую!', date: '2024-12-14' },
];

function Index() {
  const [movies, setMovies] = useState<Movie[]>(MOCK_MOVIES);
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  const toggleFavorite = (id: number) => {
    setMovies(movies.map(m => m.id === id ? { ...m, isFavorite: !m.isFavorite } : m));
  };

  const filteredMovies = movies.filter(movie => {
    const matchesGenre = selectedGenre === 'Все' || movie.genre.includes(selectedGenre);
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const favoriteMovies = movies.filter(m => m.isFavorite);
  const recommendedMovies = [...movies].sort((a, b) => b.views - a.views).slice(0, 4);
  const trendingMovies = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 6);

  const MovieCard = ({ movie }: { movie: Movie }) => (
    <Card className="glass-card hover-glow group overflow-hidden cursor-pointer animate-scale-in">
      <CardContent className="p-0">
        <div className="relative aspect-[2/3] bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <span className="text-8xl">{movie.poster}</span>
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(movie.id);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="glass-card border-b sticky top-0 z-50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-heading font-bold gradient-text">CineVerse</h1>
            <Button size="icon" variant="ghost" className="relative">
              <Icon name="User" size={24} />
            </Button>
          </div>
          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Поиск фильмов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-muted"
            />
          </div>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="container mx-auto px-4 py-6">
        <TabsList className="grid w-full grid-cols-5 mb-8 glass-card">
          <TabsTrigger value="home" className="flex items-center gap-2">
            <Icon name="Home" size={18} />
            <span className="hidden sm:inline">Главная</span>
          </TabsTrigger>
          <TabsTrigger value="catalog" className="flex items-center gap-2">
            <Icon name="Film" size={18} />
            <span className="hidden sm:inline">Каталог</span>
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Icon name="Heart" size={18} />
            <span className="hidden sm:inline">Избранное</span>
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <Icon name="MessageSquare" size={18} />
            <span className="hidden sm:inline">Рецензии</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <Icon name="User" size={18} />
            <span className="hidden sm:inline">Профиль</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="space-y-12 animate-fade-in">
          <section className="relative overflow-hidden rounded-2xl glass-card p-8 md:p-12">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-50"></div>
            <div className="relative z-10">
              <Badge className="mb-4 bg-primary/20">🔥 Сейчас в тренде</Badge>
              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4 gradient-text">
                Откройте мир кино
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
                Персональные рекомендации на основе ваших предпочтений. Смотрите лучшее кино в одном месте.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <Icon name="Play" className="mr-2" size={20} />
                Начать просмотр
              </Button>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-bold">Топ недели</h2>
              <Button variant="ghost" className="text-primary">
                Смотреть все <Icon name="ArrowRight" className="ml-2" size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {trendingMovies.map((movie, idx) => (
                <div key={movie.id} style={{ animationDelay: `${idx * 0.1}s` }}>
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <Icon name="Sparkles" className="text-primary" size={24} />
              <h2 className="text-2xl font-heading font-bold">Рекомендации для вас</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recommendedMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="catalog" className="animate-fade-in">
          <div className="mb-6">
            <h2 className="text-2xl font-heading font-bold mb-4">Жанры</h2>
            <div className="flex flex-wrap gap-2">
              {GENRES.map(genre => (
                <Badge
                  key={genre}
                  variant={selectedGenre === genre ? 'default' : 'outline'}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    selectedGenre === genre ? 'bg-primary text-primary-foreground' : ''
                  }`}
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="animate-fade-in">
          <h2 className="text-2xl font-heading font-bold mb-6">Избранное ({favoriteMovies.length})</h2>
          {favoriteMovies.length === 0 ? (
            <Card className="glass-card p-12 text-center">
              <Icon name="Heart" className="mx-auto mb-4 text-muted-foreground" size={48} />
              <p className="text-muted-foreground">Вы пока не добавили фильмы в избранное</p>
            </Card>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {favoriteMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="reviews" className="animate-fade-in">
          <h2 className="text-2xl font-heading font-bold mb-6">Последние рецензии</h2>
          <div className="space-y-4 max-w-3xl">
            {REVIEWS.map(review => {
              const movie = movies.find(m => m.id === review.movieId);
              return (
                <Card key={review.id} className="glass-card hover-glow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{movie?.poster}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-heading font-semibold text-lg">{movie?.title}</h3>
                          <Badge className="bg-primary/20">⭐ {review.rating}/10</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {review.author} • {review.date}
                        </p>
                        <p className="text-foreground">{review.text}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="profile" className="animate-fade-in">
          <div className="max-w-2xl mx-auto">
            <Card className="glass-card">
              <CardContent className="p-8">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl">
                    👤
                  </div>
                  <div>
                    <h2 className="text-2xl font-heading font-bold mb-2">Алексей Кинолюб</h2>
                    <p className="text-muted-foreground">Участник с января 2024</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <Card className="glass-card text-center p-4">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {movies.reduce((sum, m) => sum + m.views, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Просмотров</div>
                  </Card>
                  <Card className="glass-card text-center p-4">
                    <div className="text-3xl font-bold text-primary mb-1">{favoriteMovies.length}</div>
                    <div className="text-sm text-muted-foreground">Избранных</div>
                  </Card>
                  <Card className="glass-card text-center p-4">
                    <div className="text-3xl font-bold text-primary mb-1">{REVIEWS.length}</div>
                    <div className="text-sm text-muted-foreground">Рецензий</div>
                  </Card>
                </div>

                <div>
                  <h3 className="font-heading font-semibold text-lg mb-4">История просмотров</h3>
                  <div className="space-y-3">
                    {movies.filter(m => m.views > 0).sort((a, b) => b.views - a.views).slice(0, 5).map(movie => (
                      <div key={movie.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <span className="text-2xl">{movie.poster}</span>
                        <div className="flex-1">
                          <div className="font-medium">{movie.title}</div>
                          <div className="text-sm text-muted-foreground">Просмотрено {movie.views} раз</div>
                        </div>
                        <Badge variant="outline">{movie.genre[0]}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Index;
