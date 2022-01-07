// import { Post } from './post.interface';
import { UpdatePostDto } from './dto/updatePost.dto';
import { CreatePostDto } from './dto/createPost.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import PostsRepository from './posts.repository';
import { InjectRepository } from '@nestjs/typeorm';
import Post from './post.entity';
import User from 'src/users/user.entity';

@Injectable()
export class PostsService {
private lastPostId = 0;
    private posts = [];

    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>
    ){}

    getAllPost() {
        return this.postsRepository.find({relations: ["author"]});
        // return this.postsRepository.createQueryBuilder("posts").leftJoinAndSelect("posts.author","user").select(["posts","user.id","user.email","user.name"]).getMany();
    };

    async getPostById(id: number): Promise<Post> {
        const post = await this.postsRepository.findOne(id,{relations: ["author"]});
        if(post) {
            return post
        }

        throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
    }

    async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
        const newPost = await this.postsRepository.create({
            ...createPostDto,
            author: user
        });

        await this.postsRepository.save(newPost);
        return newPost;
    }

    async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
        await this.postsRepository.update(id,updatePostDto);
        const updatedPost = await this.postsRepository.findOne(id, {relations: ["author"]});
        if(updatedPost) return updatedPost;
        throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
    }

    async deletePost(id: string): Promise<void> {
        const deleteResponse = await this.postsRepository.delete(id);
        if (!deleteResponse.affected){
            throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
        }

       
    }
}
