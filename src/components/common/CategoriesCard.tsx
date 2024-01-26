import { useAppSelector } from '../../redux/redux-hooks';
import cn from '../../utilities/class-names';

interface ICategoryProps {
  categories: any;
  onClick: (item: any) => void;
}

function CategoriesCard({ categories, onClick }: ICategoryProps) {
  const categoryColor = useAppSelector(
    (state) => state.appState.systemConfig?.theme.value.categoryColor
  );
  const colorArray = categoryColor || [
    '#E1CCEC',
    '#DFD3C3',
    '#C8D9EB',
    'rgba(200, 217, 223, 0.956863)',
    'rgba(217, 217, 217, 0.956863)',
    '#FFE2E2',
  ];
  return (
    <div className="categories-list grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
      {categories.length &&
        categories.map((category: any, index: number) => (
          <button
            type="button"
            onClick={() => onClick(category.id)}
            key={category.id}
            className={cn(
              'relative flex min-h-[150px] items-center justify-between rounded-[0.625rem] py-3 pl-3 transition-all duration-[0.2s] xl:pl-6',
              { 'active shadow-lg': category.id === categories?.id }
            )}
            style={{
              background: colorArray[index % colorArray.length],
            }}
          >
            <h3 className="mb-0 grow-0 text-left text-2xl font-bold capitalize leading-tight text-secondary">
              {category.name}
            </h3>
            <div className="relative -right-2.5 w-[100px]">
              <img className="h-auto w-full" src={category.icon} alt="" />
            </div>
          </button>
        ))}
    </div>
  );
}

export default CategoriesCard;
