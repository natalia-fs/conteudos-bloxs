import { Post } from "../../../pages"
import styles from "./Post.module.css";


interface PostProps {
  post: Post
}

export function Post({post} : PostProps) {

  return (
    <>
      <a
        className={styles.postContainer}
        href={'#'}
        target="_blank"
      >

        <img
          src={post.yoast_head_json.og_image[0].url}
          className={styles.postImage}
        />
        <h3 className={styles.postTitle}> {post.title.rendered} </h3>
        <span className={styles.postDate}>
          {
            new Date(post.date)
              .toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
          }
        </span>
        <p className={styles.postDescription}>
          {post.yoast_head_json.description}
        </p>

      </a>
    </>
  )
}