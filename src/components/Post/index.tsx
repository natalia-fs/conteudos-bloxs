import { Post } from "../../../pages"
import styles from "./Post.module.css";

interface PostProps {
  post: Post
}

export function Post({post} : PostProps) {

  return (
    <div
      className={styles.postContainer}

    >
      <img
        src={post.yoast_head_json?.og_image[0]?.url}
        className={styles.postImage}
      />
      {/* TODO: implementar modal ou nova página para ler o conteúdo completo */}
      <a
        href={'#'}
        target="_blank"
        rel="noreferrer"
        className={styles.postContent}
      >
        <div>
          <h2 className={styles.postTitle}> {post.title?.rendered} </h2>
          <span className={styles.postDate}>
            { post.date &&
              new Date(post.date)
                .toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
            }
          </span>
          <p className={styles.postDescription}>
            {post.yoast_head_json?.description}
          </p>

        </div>
      </a>
    </div>
  )
}