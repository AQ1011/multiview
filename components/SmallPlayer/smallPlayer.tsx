import styles from './SmallPlayer.module.scss'

interface props {
    videoId?: string
}
const SmallPlayer = ({videoId}: props) => {
    if(!videoId)
    {
        return (
            <div className={styles.blank}>
            </div>
        )
    }
    return (
        <></>
    )
}
export default SmallPlayer;