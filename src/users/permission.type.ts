import PostsPermission from "src/postsPermission.enum";
import CategoriesPermission from "src/categoriesPermission.enum";

const Permission = {
    ...PostsPermission,
    ...CategoriesPermission
}

type Permission = PostsPermission | CategoriesPermission;

export default Permission;