import "./CategoryHeader.css";

interface CategoryHeaderProps {
  name: string;
}

/**
 * CategoryHeader component for Game screen
 * Read-only orange text display for category names
 */
export default function CategoryHeader({ name }: CategoryHeaderProps) {
  return (
    <div className="category-header">
      <span className="category-header__text">{name}</span>
    </div>
  );
}
