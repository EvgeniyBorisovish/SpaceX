import { Avatar, Box, CircularProgress, Divider} from '@mui/material';
import { grey } from '@mui/material/colors';
import {useState,useRef,useEffect} from 'react';





export default function ListLaunches() {
  
  const [loading, setLoading] = useState(false);
  const [loadedRows, setLoadedRows] = useState([]);
  const hasNextPage = useRef(true)
  const page = useRef(0)

  useEffect(()=>{
      if (loading){
       setTimeout(loadServerRows.bind(null),2000) 
      }
    
  },[loading])
  
  useEffect(()=>{
      
      setTimeout(loadServerRows.bind(null),2000) 
  },[])

  useEffect(()=>{
    if (loading){setLoading(false)}
},[loadedRows])


  const loadServerRows = async (limit_count=30) => {

    if (!hasNextPage.current){ setLoading(false); return }
     
     page.current = page.current+1

     

     const res = await fetch("https://api.spacexdata.com/v4/launches/query", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ options: { page: page.current, limit: limit_count } })
        })
      
     const docs = await res.json()
      
     hasNextPage.current = docs.hasNextPage
     const newDocs =  docs.docs.map(({id,details,name,success,links,date_utc})=>({id,name,details,success,stripe:links.patch.small,date:new Date(date_utc)}))
        
     setLoadedRows([...loadedRows,...newDocs]
      )
  };

  const scrollHandler = (e) => {
    
    
    if (
        (e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight)<=1 &&
        !loading
    ) {
        setLoading(true)
    }
  };

 

  return (
    <Box sx={{ display:"flex" , flexDirection:"column" , height:"100vh" }}>
        <Box sx={{ display:"flex", minHeight:"7vh",backgroundImage:"url(/star.jpg)",backgroundSize:"cover", backgroundColor:"rgb(18, 18, 18)" }}>
            <img src="/SpaceX-Logo.svg" alt="SpaceX"/>
        </Box>
        <Box sx={{ display:"flex",flexWrap:"wrap", flexGrow:"1",overflow:"auto"}}  onScroll={scrollHandler}>
          {
              loadedRows.map(({id,details,name,success,links,stripe,date})=>(
                <Box key={id} sx={{width: "345px",flexGrow:"1",border:`2px solid ${success?'#4CAF50':'#C0433A'}`, margin:"10px" , borderRadius:"10px",minheight:"100px",padding:"10px" }}>
                  <Box sx={{textAlign:"center"}}>
                    <Box sx={{backgroundColor:"grey",padding:"10px",display:"inline-block",backgroundColor:"grey",borderRadius:"50%"}}>
                   <Avatar  sx={{ width: "100px", height: "100px"}} variant="cilcular"  alt="Travis Howard" src={stripe} /></Box></Box>
                  <Box sx={{flexGrow:"0",color:"#005288"}} component="h1">{name}</Box>
                  <Box sx={{flexGrow:"0",color:"#A7A9AC"}} component="span">{date.toLocaleDateString()}&nbsp;&nbsp;{String(date.getHours()).padStart(2,"0")}:{String(date.getMinutes()).padStart(2,"0")}</Box> 
                  <Divider sx={{marginTop:"10px"}} />
                  <Box sx={{flexGrow:"0",color:"#A7A9AC"}} component="p">{details}</Box> 
                </Box>)
                )
          }
        <Box sx={{width:"100%",textAlign:"center",padding:"100px 0"}}><CircularProgress /></Box>  
        </Box>
        
     
    </Box>
  );
}

/*
<div >
                <div>{id}</div>     
                <div>{name}</div>     
                <div>{success}</div>     
                <div>{stripe}</div>     
                <div>{date}</div>
            </div>

*/