# База даних аніме серіалів
**Лабораторна робота 1**

**студент групи КВ-82 Шеремет Дмитро**

## Сутності:
* Genre: 
    * genre_id (Primary Key)
    * g_name 
* User 
    * user_id (Primary Key)
    * username
    * registry_date
    * user_pasport_id (Foreign Key)
* Pasport 
    * pasport_id (Primary Key)
    * name 
    * surname
    * birth_date
* Watched
    * a_watched_id (Primary Key)
    * watch_anime_id (Foreign Key)
    * watch_user_id (Foreign Key)
* Anime
    * anime_id (Primary Key)
    * a_name 
    * genre (Foreign Key)
    * description
    * series
* Review
    * review_id (Primary Key)
    * r_text
    * user_id (Foreign Key)
    * anime_id (Foreign Key)
    
## Зв'язки:
* Many To Many: між User та Anime за допомогою таблиці Watched
* One to Many: між Genre та Anime, Anime та Review, User та Review
* One to 0ne: між User та Pasport
   
## ER Diagram
![1](https://github.com/kikkigenkai/DB/blob/master/lab1/Untitled%20Diagram.jpg)

## DB Structure
![1](https://github.com/kikkigenkai/DB/blob/master/lab1/logic%20scheme%20v2.png)
