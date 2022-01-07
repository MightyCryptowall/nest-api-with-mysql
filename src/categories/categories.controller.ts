import Category from 'src/categories/category.entity';
import { CategoriesService } from './categories.service';
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import FindOneParams from 'src/utils/findOneParams';
import CreateCategoryDto from './dto/createCategory.dto';
import UpdateCategoryDto from './dto/updateCategory.dto';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';

@Controller('categories')
@UseInterceptors(ClassSerializerInterceptor)
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService
    ){}

    @Get()
    async getAllCategories(): Promise<Category[]>{
        return this.categoriesService.getAllCategories();
    }

    @Get(":id")
    async getCategoryById(@Param() {id}: FindOneParams): Promise<Category> {
        return this.categoriesService.getCategoryById(Number(id));
    }

    @Post()
    @UseGuards(JwtAuthenticationGuard)
    async createCategory(@Body() category: CreateCategoryDto) {
        return this.categoriesService.createCategory(category);
    }

    @Patch(':id')
    async updateCategory(@Param() { id }: FindOneParams, @Body() category: UpdateCategoryDto) {
        return this.categoriesService.updateCategory(Number(id), category);
    }

    @Delete(':id')
    async deleteCategory(@Param() { id }: FindOneParams) {
        return this.categoriesService.deleteCategory(Number(id));
    }

}
