type Props = {
    accounts: any;
    selectedAccount: any;
    selectAccount: any;
};
const AccountsDropdown = ({
    accounts,
    selectedAccount,
    selectAccount,
}: Props) => {
    return (
        <div className="dropdown">
            <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {selectedAccount
                    ? `${selectedAccount.type} — ${selectedAccount.number}`
                    : "Select account"}
            </button>

            <ul className="dropdown-menu">
                <li>
                    <button className="dropdown-item text-muted" disabled>
                        Select account
                    </button>
                </li>

                <li>
                    <hr className="dropdown-divider" />
                </li>
                {accounts.accounts.map((acc: any) => (
                    <li key={acc.number}>
                        <button
                            className="dropdown-item d-flex justify-content-between align-items-center"
                            onClick={() => selectAccount(acc)}
                        >
                            <span>
                                {acc.type} — {acc.number}
                            </span>

                            {acc.isPrimary && (
                                <span className="badge bg-success ms-2">
                                    Primary
                                </span>
                            )}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default AccountsDropdown;
