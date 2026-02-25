import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { OAUTH_CONFIG } from "../config";

interface Props {
    onSelect: (item: SymbolItem) => void;
}

interface SymbolItem {
    symbol: string;
    symbolId: number;
    description: string;
    securityType: string;
    listingExchange: string;
    isTradable: boolean;
    isQuotable: boolean;
    currency: string;
}

// const SymbolSearch = () => {
const SymbolSearch: React.FC<Props> = ({ onSelect }) => {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [suggestions, setSuggestions] = useState<SymbolItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<SymbolItem | null>(null);
    const [selectedSymbolData, setSelectedSymbolData] =
        useState<SymbolItem | null>(null);

    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const [showDropdown, setShowDropdown] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const abortControllerRef = useRef<AbortController | null>(null);
    const api = axios.create({ baseURL: OAUTH_CONFIG.backUrl });

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        if (debouncedQuery.length < 1) {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }
        fetchSymbols();
        return () => abortControllerRef.current?.abort();
    }, [debouncedQuery]);

    // ---------------------------------
    // Hide dropdown on outside click
    // ---------------------------------
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // ---------------------------------
    // Auto-scroll active item
    // ---------------------------------
    useEffect(() => {
        if (activeIndex >= 0 && listRef.current) {
            const item = listRef.current.children[activeIndex] as HTMLElement;
            item?.scrollIntoView({
                block: "nearest",
            });
        }
    }, [activeIndex]);

    useEffect(() => {
        fetchSymbol();
    }, [selectedItem]);

    // ---------------------------------
    // Keyboard navigation
    // ---------------------------------
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showDropdown) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setActiveIndex((prev) =>
                    prev < suggestions.length - 1 ? prev + 1 : 0,
                );
                break;

            case "ArrowUp":
                e.preventDefault();
                setActiveIndex((prev) =>
                    prev > 0 ? prev - 1 : suggestions.length - 1,
                );
                break;

            case "Enter":
                e.preventDefault();
                if (activeIndex >= 0) {
                    selectItem(suggestions[activeIndex]);
                }
                break;

            case "Escape":
                setShowDropdown(false);
                break;
        }
    };

    const selectItem = (item: SymbolItem) => {
        setQuery(item.symbol);
        setSelectedItem(item);
        setShowDropdown(false);
        setActiveIndex(-1);
        onSelect(item); // 👈 send to parent
    };

    const clearInput = () => {
        setQuery("");
        setSuggestions([]);
        setShowDropdown(false);
        setActiveIndex(-1);
    };

    // ---------------------------------
    // 🔥 Bold matching letters
    // ---------------------------------
    const highlightMatch = (text: string) => {
        if (!query) return text;

        const regex = new RegExp(`(${query})`, "gi");
        const parts = text.split(regex);

        return parts.map((part, index) =>
            regex.test(part) ? <strong key={index}>{part}</strong> : part,
        );
    };
    const fetchSymbols = async () => {
        abortControllerRef.current?.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;
        setError(null);

        try {
            setLoading(true);
            setActiveIndex(-1);

            // const response = await axios.get(
            //     `/api/symbols?search=${debouncedQuery}`,
            //     { signal: controller.signal },
            // );
            const response = await api.get(
                `/symbols/search?prefix=${debouncedQuery}`,
                { signal: controller.signal },
            );
            const symbolsResponse = response.data.symbols;
            // console.log("fetchSymbols response.data:", symbolsResponse);

            setSuggestions(symbolsResponse);
            setShowDropdown(true);
        } catch (error: any) {
            if (error.name !== "CanceledError") {
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchSymbol = async () => {
        abortControllerRef.current?.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;
        setError(null);

        try {
            setLoading(true);
            // setActiveIndex(-1);

            // const response = await axios.get(
            //     `/api/symbols?search=${debouncedQuery}`,
            //     { signal: controller.signal },
            // );
            const response = await api.get(
                `/symbols/${selectedItem?.symbolId}`,
                // {
                //     signal: controller.signal,
                // },
            );
            const symbolResponse = response.data.symbols;
            // console.log("fetchSymbols response.data:", symbolsResponse);

            setSelectedSymbolData(symbolResponse);
            // setShowDropdown(true);
        } catch (error: any) {
            if (error.name !== "CanceledError") {
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="position-relative" ref={wrapperRef}>
            <form
                className="d-flex position-relative"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search symbol"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                {query && (
                    <button
                        type="button"
                        className="btn btn-sm position-absolute end-0 me-5"
                        onClick={clearInput}
                    >
                        ✖
                    </button>
                )}

                <button className="btn btn-outline-success">Search</button>
            </form>

            {showDropdown && (
                <ul
                    ref={listRef}
                    className="list-group position-absolute w-100 z-3"
                    style={{ maxHeight: "250px", overflowY: "auto" }}
                >
                    {loading && <li className="list-group-item">Loading...</li>}

                    {!loading && suggestions.length === 0 && (
                        <li className="list-group-item text-muted">
                            No results found
                        </li>
                    )}

                    {!loading &&
                        suggestions.map((item, index) => (
                            <li
                                key={index}
                                className={`list-group-item list-group-item-action ${
                                    index === activeIndex ? "active" : ""
                                }`}
                                onMouseEnter={() => setActiveIndex(index)}
                                onClick={() => selectItem(item)}
                            >
                                {highlightMatch(item.symbol)} —{" "}
                                {highlightMatch(item.description)}
                            </li>
                        ))}
                </ul>
            )}

            {selectedItem && (
                <div className="card mt-3">
                    <div className="card-body">
                        <h5 className="card-title">{selectedItem.symbol}</h5>
                        <p className="card-text">{selectedItem.description}</p>
                    </div>
                    <pre className="mt-3">
                        {JSON.stringify(selectedItem, null, 2)}
                    </pre>
                </div>
            )}
            {selectedSymbolData && (
                <div className="card mt-3">
                    <div className="card-body">
                        <h5 className="card-title">
                            {selectedSymbolData.symbol}
                        </h5>
                        <p className="card-text">
                            {selectedSymbolData.description}
                        </p>
                    </div>
                    <pre className="mt-3">
                        {JSON.stringify(selectedSymbolData, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default SymbolSearch;
