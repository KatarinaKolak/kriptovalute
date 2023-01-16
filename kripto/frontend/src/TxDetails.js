import React, {useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const TxDetails = () => {
    const params = useParams();
    const [info, setInfo] = useState("");
    const [txFee, setTxFee] = useState("");
    const [value, setValue] = useState("");
    const [spent, setSpent] = useState("");
    console.log("PARAMS: ", params.id);

    async function getTransaction(){
        
        const transaction = await fetch(`http://localhost:4444/api/getrawtransaction/${params.id}`);
        const transactionJson = await transaction.json();
        setInfo(transactionJson);
        console.log("TRANS: ", transactionJson.txid)

        const fee = await fetch(`http://localhost:4444/api/getFee/${params.id}`);
        const feeJson = await fee.json();
        setTxFee(feeJson);

        const btcvalue = await fetch(`http://localhost:4444/api/getValue/${params.id}`);
        const btcvalueJson = await btcvalue.json();
        setValue(btcvalueJson);

        const spentValue = await fetch(`http://localhost:4444/api/getSpent/${params.id}`);
        const spentValueJson = await spentValue.json();
        setSpent(spentValueJson);
    }

    useEffect(() => {
        getTransaction();
      }, []);

    return(
        <div className="container justify-content-center">
            <h2> Transaction details</h2>
            { info.length == 0 ? '' :
            (
            
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <th class="table-light" scope="col">Txid</th>
                        <td class="table-light">{info.txid}</td> 
                    </tr>
                    <tr>
                        <th class="table-light" scope="col">Version</th>
                        <td class="table-light">{info.version}</td> 
                    </tr>
                    <tr>
                        <th class="table-light" scope="col">Hash</th>
                        <td class="table-light">{info.hash}</td> 
                    </tr> 
                    <tr>
                        <th class="table-light" scope="col">Size</th>
                        <td class="table-light">{info.size}</td> 
                    </tr>
                    <tr>
                        <th class="table-light" scope="col">Weight</th>
                        <td class="table-light">{info.weight}</td> 
                    </tr>
                    <tr>
                        <th class="table-light" scope="col">Locktime</th>
                        <td class="table-light">{info.locktime}</td> 
                    </tr>
                    <tr>
                        <th class="table-light" scope="col">Total fee</th>
                        <td class="table-light">{txFee}</td> 
                    </tr>
                    <tr>
                        <th class="table-light" scope="col">Value: </th>
                        <td class="table-light">{value} BTC</td> 
                    </tr>
                    <tr>
                        <th class="table-light" scope="col">Spent: </th>
                        <td class="table-light">{spent} BTC</td> 
                    </tr>
                </tbody>
            </table>
            )
        }

        <h4>Input transactions</h4>
        {info.length == 0 ? '' : 
            
                info.vin.map((it) =>{
                    return( 
                    <table className="table table-bordered">
                    
                    <tbody>
                    <tr>
                        <td class="table-light">Txid</td> 
                        <td class="table-light">{it.txid}</td> 
                    </tr>
                    <tr>
                        <td class="table-light">Vout</td> 
                        <td class="table-light">{it.vout}</td> 
                    </tr>
                   
                        
                    </tbody>
                </table>
                )
                })
            
        }

       
    <h4>Output transactions</h4>
        {info.length == 0 ? '' : 
            
                info.vout.map((it) =>{
                    return( 
                    <table className="table table-bordered">
                    
                    <tbody>
                    <tr>
                        <td class="table-light">Value</td> 
                        <td class="table-light">{it.value}</td> 
                    </tr>
                    <tr>
                        <td class="table-light">Type</td> 
                        <td class="table-light">{it.scriptPubKey.type}</td> 
                    </tr>
                        
                    </tbody>
                </table>
                )
                })
            
        }

        </div>
    )
}

export default TxDetails;
