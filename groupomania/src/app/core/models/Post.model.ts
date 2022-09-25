export class post {
    userId!:string;
    _id!: string;
    name!: string;
    post!: string;
    imageUrl?: string
    likes!: number;
    dislikes!: number;
    usersLiked: string[] = [];
    usersDisliked: string[] = [];
}