// import axios from "axios";
// import React, { useEffect, useState } from "react";
import { useState } from "react";

// import { OAUTH_CONFIG } from "../config";
// import { useIsAuth } from "../context/AuthContext";
import SymbolSearch from "./SymbolSearch";

const Symbols = () => {
    const [selectedSymbol, setSelectedSymbol] = useState<any | null>(null);

    return (
        <div>
            <SymbolSearch onSelect={setSelectedSymbol} />

            {selectedSymbol && (
                <div>
                    <h3>{selectedSymbol.symbol}</h3>
                    <p>{selectedSymbol.name}</p>
                </div>
            )}
        </div>
    );
};

export default Symbols;
