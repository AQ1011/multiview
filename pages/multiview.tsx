import SmallPlayer from "../components/SmallPlayer/smallPlayer";

export default function Multiview() {

    return (
        <div style={{width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap'}}>
            <SmallPlayer></SmallPlayer>
            <SmallPlayer></SmallPlayer>
            <SmallPlayer></SmallPlayer>
            <SmallPlayer></SmallPlayer>
        </div>
    )
}