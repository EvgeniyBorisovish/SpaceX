import { action, makeObservable } from "mobx"

class Main{

constructor(rootStore) {
        this.loading = false
        this.loadedRows = []
        this.hasNextPage = true
        this.page = 0
    }

    loadServerRows = async (limit_count=30) => {

        if (!this.hasNextPage){ return }
         
         ++this.page
    
         const res = await fetch("https://api.spacexdata.com/v4/launches/query", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({ options: { page: this.page, limit: this.limit } })
            })
          
         const docs = await res.json()
          
         this.hasNextPage = docs.hasNextPage
         this.loadedRows.push(...docs.docs.map(({id,details,name,success,links,date_utc})=>({id,name,details,success,stripe:links.patch.small,date:new Date(date_utc)}))) 

         this.loading = false 
          
      };

}

export default new Main()
