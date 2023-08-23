import { tenantId } from '../utilities/constant';
import network from '../utilities/network';

const CategoryList = () => {
  return network.get(`homemenu/list/${tenantId}`);
};
const SubCategory = (menuId: string | null) => {
  return network.get(`homemenu/view/${tenantId}/${menuId}`);
};
export default {
  CategoryList,
  SubCategory,
};
