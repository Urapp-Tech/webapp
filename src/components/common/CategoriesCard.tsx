import { useAppSelector } from '../../redux/redux-hooks';

function getCategoryClasses(isActive: boolean) {
  const classes = 'item';

  if (isActive) {
    return `${classes} active shadow-lg`;
  }
  return classes;
}
interface ICategoryProps {
  categories: any;
  onClick: (item: any) => void;
}

function CategoriesCard({ categories, onClick }: ICategoryProps) {
  const categoryColor = useAppSelector(
    (state) => state.appState.systemConfig?.theme.value.categoryColor
  );
  const colorArray = categoryColor || [
    '#e1ccec',
    '#dfd3c3',
    '#c8d9eb',
    'rgba(200, 217, 223, 0.956863)',
    'rgba(217, 217, 217, 0.956863)',
    '#ffe2e2',
  ];
  return (
    <div className="categories-list">
      {categories.length &&
        categories.map((category: any, index: number) => (
          <button
            type="button"
            onClick={() => onClick(category.id)}
            key={category.id}
            className={getCategoryClasses(category.id === categories?.id)}
            style={{
              background: colorArray[index % colorArray.length],
            }}
          >
            <h3 className="cat-name">{category.name}</h3>
            <div className="cat-img">
              <img src={category.icon} alt="" />
            </div>
          </button>
        ))}
    </div>
  );
}

export default CategoriesCard;
