import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface AppHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function AppHeader({ searchQuery, onSearchChange }: AppHeaderProps) {
  return (
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
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-muted/50 border-muted"
          />
        </div>
      </div>
    </header>
  );
}
