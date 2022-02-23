export default function Card({className,card,content, ...other}) {     
    return (      		
       <> 
       {          
        card.map((card,index)=>(
            <div className="relative mb-[1.5rem] bg-[#ECECEC] p-0 flex flex-col" key={card.id}>
               <div className="color-[#172b4c] block relative py-4 px-2 text-center">
                <h4 className="inline-block m-0 font-bold text-[18px] text-[#404040] text-xl z-auto">{card.title}</h4>
              </div>
              <div className="py-4 flex-auto text-center">         
                <p className="font-black text-4xl text-[#696969]">{card.content}</p>
              </div>
              </div>
             )
            )            
        }	
        </>          
    );
  }
  
  