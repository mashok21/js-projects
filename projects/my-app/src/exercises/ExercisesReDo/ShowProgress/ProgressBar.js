import {useMemo} from "react"

export default function ProgressBar (props) {
    
    const {tasks} = props
    const totalCount = useMemo(() => tasks.length, [tasks])
    const trueCount = useMemo(() => tasks.filter(task => task.completed).length, [tasks])
    const percent = useMemo(() => trueCount/totalCount, [totalCount, trueCount])

    return (
        <progress id="myProgress" value={percent} max="1"></progress>
    )
}