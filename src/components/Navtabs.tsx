const Navtabs = () => {
    return (
        <>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                        className="nav-link active"
                        id="nav-home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-home"
                        type="button"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true"
                    >
                        Home
                    </button>
                    <button
                        className="nav-link"
                        id="nav-profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-profile"
                        type="button"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="false"
                    >
                        Profile
                    </button>
                    <button
                        className="nav-link"
                        id="nav-contact-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-contact"
                        type="button"
                        role="tab"
                        aria-controls="nav-contact"
                        aria-selected="false"
                    >
                        Contact
                    </button>
                    <button
                        className="nav-link"
                        id="nav-disabled-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-disabled"
                        type="button"
                        role="tab"
                        aria-controls="nav-disabled"
                        aria-selected="false"
                        disabled
                    >
                        Disabled
                    </button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div
                    className="tab-pane fade show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                    tabIndex={0}
                >
                    Home
                </div>
                <div
                    className="tab-pane fade"
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                    tabIndex={0}
                >
                    Profile
                </div>
                <div
                    className="tab-pane fade"
                    id="nav-contact"
                    role="tabpanel"
                    aria-labelledby="nav-contact-tab"
                    tabIndex={0}
                >
                    Contact
                </div>
                <div
                    className="tab-pane fade"
                    id="nav-disabled"
                    role="tabpanel"
                    aria-labelledby="nav-disabled-tab"
                    tabIndex={0}
                >
                    Disabled
                </div>
            </div>
        </>
    );
};

export default Navtabs;
