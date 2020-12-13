import { Review } from '../entity/Review.js';
import { Reader } from '../utils/readers.js';
import { Printer } from '../utils/printers.js';

import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { question } from 'readline-sync';
import { User } from '../entity/User.js';
import { Anime } from '../entity/Anime.js';

export class ReviewService {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = getConnection();
    }

    async addDataReview() {
        const review: Review = Reader.prepareDataReview();

        try {
            await this.connection.manager.save(review);

            console.log(`Review with id ${review.review_id} has been saved`);

            return;
        } catch (err) {
            console.log('Something went wrong');
            
            return;
        }
    }

    async editDataReview() {
        const editId: number = +question('Review id: ');

        try {
            const reviewRepo: Repository<Review> = getRepository(Review);
            let reviewEdit: Review = await reviewRepo.findOne({
                where: {
                    review_id: editId
                }
            });

            if (!reviewEdit) {
                console.log(`There is no review with id ${editId} in database`);

                return;
            } else {
                const review: Review = Reader.prepareDataReview();
                const userRepo: Repository<User> = getRepository(User);
                const animeRepo: Repository<Anime> = getRepository(Anime);
            
                const userRow: User = await userRepo.findOne({
                    where: { user_id: review.rev_user_id }
                });
                const animeRow: Anime = await animeRepo.findOne({
                    where: { anime_id: review.rev_anime_id }
                });

                if (!userRow || !animeRow) {
                    console.log(`There is no user with id ${userRow.user_id} or anime with id ${animeRow.anime_id} in database`);

                    return;
                } else {
                    await this.connection
                        .createQueryBuilder()
                        .update(Review)
                        .set({ ...review })
                        .where('review_id = :id', { id: editId })
                        .execute();

                        console.log(`Review with id ${editId} has been updated`);

                        return;
                }
            }
        } catch (err) {
            console.log('Something went wrong');

            return;
        }
    }

    async deleteDataReview() {
        const deleteId: number = +question('Review id: ');

        try {
            const reviewRepo: Repository<Review> = getRepository(Review);
            const review: Review = await reviewRepo.findOne({
                where: {
                    review_id: deleteId
                }
            });

            if (!review) {
                console.log(`There is no review with id ${deleteId} in database`);

                return;
            } else {
                await this.connection
                    .createQueryBuilder()
                    .delete()
                    .from(Review)
                    .where('review_id = :id', { id: deleteId })
                    .execute();

                console.log(`Review with id ${deleteId} has been deleted`);

                return;
            }
        } catch (err) {
            console.log('Something went wrong');

            return;
        }
    }

    async showDataReview() {
        try {
            const reviews: Review[] = await this.connection.manager.find(Review);

            Printer.printReviews(reviews);

            return;
        } catch (err) {
            console.log(err);

            return;
        }
    }
}