import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Explorer = () => {
    const [search, setSearch] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [difficulty, setDifficulty] = useState([]);
    const [blockchainInfo, setBlockchainInfo] = useState([]);
    const [mempool, setMempool] = useState([]);
    const [blockHash, setBlockHash] = useState("");

    function onChangeSearch(e) {
        setSearch(e.target.value);
    }
    

    async function getBlock(search){
        const blockInfo = await fetch(`http://127.0.0.1:4444/api/getBlockHash/${search}`);
        const blockJson = await blockInfo.json();
        console.log("INFO", blockInfo);
        setTransactions(blockJson);
        
    }

    async function getDifficulty(){
        const difficultyInfo = await fetch("http://127.0.0.1:4444/api/getdifficulty");
        const difficultyJson = await difficultyInfo.json();
        console.log("Difficulty", difficultyJson);
        setDifficulty(difficultyJson.result);
    }

    async function getBlockchainInfo(){
        const blockchain = await fetch("http://127.0.0.1:4444/api/getblockchaininfo/");
        const blockchainJson = await blockchain.json();
        console.log("Blockchain: ", blockchainJson);
        setBlockchainInfo(blockchainJson.result);
    }

    async function getMempool(){
        const mempoolInfo = await fetch("http://127.0.0.1:4444/api/getrawmempool/");
        const mempoolJson = await mempoolInfo.json();
        console.log("Mempool: ", mempoolJson);
        setMempool(mempoolJson.result);
    }

    useEffect(() => {
        getDifficulty();
      }, []);

    useEffect(() => {
        getBlockchainInfo();
    }, []);
    
    useEffect(() => {
        getMempool();
    }, []);

    return(
        <div className="container">

            <form class="example" onSubmit={(e) => {getBlock(e);}}>
                <div className="form-group col-md-6 form-check-inline">
                    <input
                        type="text"
                        value={search} className="form-control" 
                        placeholder="Search height or hash"
                        onChange={onChangeSearch}
                        onBlur={onChangeSearch}
                    ></input>

        {
            !isNaN(parseInt(search.length)) ? 
            (<div>
                <Link to={`/block/${search}`}><button type="submit" className="btn btn-outline-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg></button></Link><br/><br/></div>
            ) : search.startsWith('00000000') ? 
            (
                <div>
                    <Link to={`/blockByHash/${search}`}><button type="submit" className="btn btn-outline-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg></button></Link><br/><br/></div>
            ) : 
            (
                <div>
                    <Link to={`/tx/${search}`}><button type="submit" className="btn btn-outline-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg></button></Link><br/><br/></div>
            )
        }
                
            </div>
            </form>

            <table className="table table-bordered">
                <thead >
                    <tr>
                    <th class="table-light" scope="col">Chain</th>
                    <th class="table-light" scope="col">Difficulty</th>
                    <th class="table-light" scope="col">Blocks</th>
                    <th class="table-light" scope="col">Mediantime</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td class="table-light">{blockchainInfo.chain}</td>
                    <td class="table-light">{difficulty}</td>
                    <td class="table-light">{blockchainInfo.blocks}</td>
                    <td class="table-light">{blockchainInfo.mediantime}</td>
                    </tr>
                    
                </tbody>
            </table>


            <table className="table table-bordered">
                <thead >
                    <tr>
                    <th class="table-light" scope="col">Mempool transaction</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                            Object.keys(mempool).map((it) =>{
                                return(
                                    <Link to={`/tx/${mempool[it]}`}>
                                        <tr><td class="table-light">{mempool[it]}</td> </tr>
                                    </Link>
                                )
                            })
                        }
                    
                   
                    
                </tbody>
            </table>
            
            
            
            
        </div>
    );
}

export default Explorer;