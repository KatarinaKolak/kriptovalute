import React, {useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Blockchain = () => {
    const params = useParams();
    const [info, setInfo] = useState("");

    async function getInfo(){
        
        const info = await fetch("http://localhost:4444/api/getblockchaininfo");
        const infoJson = await info.json();
        setInfo(infoJson.result);
        console.log("Info: ", (infoJson.result))

    }

    useEffect(() => {
        getInfo();
      }, []);

    return(
        <div className="container justify-content-center">
            <h3>Blockchain</h3><br/>
            <table className="table table-bordered">
                
                <tbody>
                <tr>
                    <th class="table-light" scope="col">Chain</th>
                    <td class="table-light">{info.chain}</td>
                    </tr>
                    <tr>
                        <th class="table-light" scope="col">Block</th>
                        <td class="table-light">{info.blocks}</td>
                    </tr>
                    <tr>
                    <th class="table-light" scope="col">Headers</th>
                    <td class="table-light">{info.headers}</td>
                    </tr>
                    <tr>
                    <th class="table-light" scope="col">Difficulty</th>
                    <td class="table-light">{info.difficulty}</td>
                    </tr>
                    <tr>
                    <th class="table-light" scope="col">Mediantime</th>
                    <td class="table-light">{info.mediantime}</td>
                    </tr>
                    <tr>
                    <th class="table-light" scope="col">Bestblock</th>
                    <td class="table-light">{info.bestblockhash}</td>
                    </tr>
                </tbody>
            </table>
            <br/>

            
        </div>
    )
}

export default Blockchain;
