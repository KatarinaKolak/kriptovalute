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
        const info = await fetch(`http://localhost:4444/api/getblock/${params.id}`);
        const infoJson = await info.json();
        setInfo(infoJson);
        console.log("BLOCK2: ", infoJson)

        const statistics = await fetch(`http://localhost:4444/api/getblockstats/${params.id}`);
        const statsJson = await statistics.json();
        setStats(statsJson);
        console.log("STATS: ", statsJson);
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
                    <td class="table-light">{info.height}</td>
                    </tr>
                    
                </thead>
                <tbody>
                    <tr>
                        <th class="table-light" scope="col">Hash</th>
                        <td class="table-light">{info.hash}</td>
                    </tr>
                    <tr>
                        <th class="table-light" scope="col">Number of transactions</th>
                        <td class="table-light">{info.nTx}</td>
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
                    
                    
                    {info.length == 0 ? '' : 
                        (
                            <table className="table table-bordered">
                               
                            <tbody>
                            <tr>
                                <th class="table-light" scope="col">Next block hash</th>
                                <td class="table-light">{info.nextblockhash}</td>
                            </tr>
                            <tr>
                                <th class="table-light" scope="col">Previous block hash</th>
                                <td class="table-light">{info.previousblockhash}</td>
                            </tr>
                            <tr>
                                <th class="table-light" scope="col">Merkle root</th>
                                <td class="table-light">{info.merkleroot}</td>
                            </tr>
                            <tr>
                        <th class="table-light" scope="col">Size</th>
                        <td class="table-light">{info.size}</td>
                    </tr>
                    <tr>
                        <th class="table-light" scope="col">Confirmations</th>
                        <td class="table-light">{info.confirmations}</td>
                    </tr>
                    <tr>
                        <th class="table-light" scope="col">Nonce</th>
                        <td class="table-light">{info.nonce}</td>
                    </tr>
                            </tbody>
                        </table>
                        )
                    
                    }
                        
                    
                   
                    
            {info.length == 0 ? '' : 
            ( 
            
            <table className="table table-bordered">
                <thead >
                    <tr>
                    <th class="table-light" scope="col">Block transactions</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                            info.tx.map((it) =>{
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
