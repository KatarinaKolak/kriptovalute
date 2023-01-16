import React, {useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const BlockDetails = () => {
    const params = useParams();
    const [info, setInfo] = useState("");
    const [stats, setStats] = useState("");
    const [blockdetails, setBlockDetails] = useState("");

    console.log("PARAMS: ", params.id);

    async function getBlock(){
        
        const block = await fetch(`http://localhost:4444/api/getblockhash/${params.id}`);
        const blockJson = await block.json();
        setInfo(blockJson);
        console.log("BLOCK hash: ", typeof(blockJson.result))

        const block2 = await fetch(`http://localhost:4444/api/getblock/${blockJson.result}`);
        const blockJson2 = await block2.json();
        setBlockDetails(blockJson2);
        console.log("BLOCK2: ", blockJson2)

        const statistics = await fetch(`http://localhost:4444/api/getblockstats/${blockJson.result}`);
        const statsJson = await statistics.json();
        setStats(statsJson);
        console.log("Stats: ", statsJson);
    }

    useEffect(() => {
        getBlock();
      }, []);

    return(
        <div className="container justify-content-center">
            <h3>Block</h3><br/>
            <table className="table table-bordered">
                <thead >
                <tr>
                    <th class="table-light" scope="col">Height</th>
                    <td class="table-light">{params.id}</td>
                    </tr>
                    
                </thead>
                <tbody>
                    <tr>
                        <th class="table-light" scope="col">Hash</th>
                        <td class="table-light">{info.result}</td>
                    </tr>
                    
                </tbody>
            </table>
            <br/>

            {stats == "" ? '' : 
                        (
                            <table className="table table-bordered">
                               
                            <tbody>
                            
                    <tr>
                        <th class="table-light" scope="col">Total size</th>
                        <td class="table-light">{stats.total_size}</td>
                    </tr>
                    <tr>
                        <th class="table-light" scope="col">Medianfee</th>
                        <td class="table-light">{stats.medianfee}</td>
                    </tr>
                    <tr>
                        <th class="table-light" scope="col">Totalfee</th>
                        <td class="table-light">{stats.totalfee}</td>
                    </tr>
                    <tr>
                        <th class="table-light" scope="col">Number of inputs</th>
                        <td class="table-light">{stats.ins}</td>
                    </tr>
                    <tr>
                        <th class="table-light" scope="col">Number of outputs</th>
                        <td class="table-light">{stats.outs}</td>
                    </tr>
                    <tr>
                        <th class="table-light" scope="col">Number of transactions</th>
                        <td class="table-light">{stats.txs}</td>
                    </tr>
                    <tr>
                        <th class="table-light" scope="col">Maxfee</th>
                        <td class="table-light">{stats.maxfee}</td>
                    </tr>
                    <tr>
                        <th class="table-light" scope="col">Minfee</th>
                        <td class="table-light">{stats.minfee}</td>
                    </tr>
                            </tbody>
                        </table>
                        )
                    
                    }

           
            
                    
                    {blockdetails.length == 0 ? '' : 
                        (
                            <table className="table table-bordered">
                               
                            <tbody>
                            <tr>
                                <th class="table-light" scope="col">Next block hash</th>
                                <td class="table-light">{blockdetails.nextblockhash}</td>
                            </tr>
                            <tr>
                                <th class="table-light" scope="col">Previous block hash</th>
                                <td class="table-light">{blockdetails.previousblockhash}</td>
                            </tr>
                            <tr>
                                <th class="table-light" scope="col">Merkle root</th>
                                <td class="table-light">{blockdetails.merkleroot}</td>
                            </tr>
                            <tr>
                        <th class="table-light" scope="col">Size</th>
                        <td class="table-light">{blockdetails.size}</td>
                    </tr>
                    <tr>
                        <th class="table-light" scope="col">Confirmations</th>
                        <td class="table-light">{blockdetails.confirmations}</td>
                    </tr>
                    <tr>
                        <th class="table-light" scope="col">Nonce</th>
                        <td class="table-light">{blockdetails.nonce}</td>
                    </tr>
                            </tbody>
                        </table>
                        )
                    
                    }
                        
                    
                   
                    
            {blockdetails.length == 0 ? '' : 
            ( 
            
            <table className="table table-bordered">
                <thead >
                    <tr>
                    <th class="table-light" scope="col">Block transactions</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                            blockdetails.tx.map((it) =>{
                                return(<tr><td class="table-light">{it}</td> </tr>)
                            })
                        }
                    
                   
                    
                </tbody>
            </table>
            )}
        </div>
    )
}

export default BlockDetails;
