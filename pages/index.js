import ListLaunches from "../components/OthersComponents/ListLaunchesOld";
import main from "../store/main";

export default function Home() {
  return (
    <div >
     <ListLaunches mainStore={main}/>
    </div>
  )
}
