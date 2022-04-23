import BookmarkButton from './BookmarkButton';
import CopySnippetButton from './CopySnippetButton';

function getDateDisplay(age) {
  if (!age || age === 'unknown' || age < 1000) {
    return '';
  }
  return `${(new Date(age)).toLocaleDateString(undefined, { month: '2-digit', day: '2-digit', year: 'numeric' })} ${(new Date(age)).getHours().toString().padStart(2, 0)}:${(new Date(age)).getMinutes().toString().padStart(2, 0)}`;
}

function getElapsedTime(deployer_date, contract_age) {
  if (!deployer_date || deployer_date === 'unknown' || deployer_date < 1000) {
    return '';
  }
  if (!contract_age || contract_age === 'unknown' || contract_age < 1000) {
    return '';
  }

  let diff = (new Date(contract_age)) - (new Date(deployer_date));
  let days = Math.floor(diff / (24 * 60 * 60 * 1000));
  diff = diff % (24 * 60 * 60 * 1000);
  let hours = Math.floor(diff / (60 * 60 * 1000));
  diff = diff % (60 * 60 * 1000);
  let minutes = Math.floor((diff / (60 * 1000)))

  days = days ? days + 'd ' : ''
  hours = hours ? hours + 'h ' : ''
  minutes = minutes ? minutes + 'm' : ''

  return `${days} ${hours} ${minutes}`.trim();
}

function TokenSnippet({ address, tokenData }) {

  let tokenDisplayName = `${tokenData.name || 'No Name'} (${tokenData.symbol || 'No Symbol'})`;
  let deployerAge = getDateDisplay(tokenData.age * 1000);
  let contractAge = getDateDisplay(tokenData.created);
  let elapsedTime = getElapsedTime(tokenData.age * 1000, tokenData.created);

  var statusBadges = [];
  if (!tokenData.launched) {
    statusBadges.push((
      <span key="launched" className={`bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-800 dark:text-emerald-200`}>Not Launched</span>
    ));
  }
  if (tokenData.rugtxs) {
    let addressortx = tokenData.rugtxs[0].length > 42 ? 'TX' : 'ADDRESS';
    statusBadges.push((
      <span key="rugtxs" className={`bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-300 dark:text-red-900`}>Maybe Rugger <a href={`https://etherscan.io/${addressortx}/${tokenData.rugtxs[0]}`} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline dark:text-blue-800">({addressortx})</a></span>
    ))
  }
  if (tokenData.stealth) {
    statusBadges.push((
      <span key="stealth" className={`bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900`}>Stealth</span>
    ));
  }
  
  var deployerInfo = [];
  if (!!tokenData.balance) {
    deployerInfo.push(`${tokenData.balance} ETH`);
  }
  if (!!tokenData.cex) {
    deployerInfo.push(tokenData.cex);
  }
  let deployerInfoHtml = ` (${deployerInfo.join(', ')})`;

  let htmlToCopy = `${tokenDisplayName}<br><a href='https://etherscan.io/address/${tokenData.creator}'>Creator</a>: ${tokenData.creator}<br><a href='https://etherscan.io/address/${address}#code'>Contract</a>: ${address}<br>Created: ${contractAge || 'N/A'}`;

  let textToCopy = `${tokenDisplayName}\r\nCreator: https://etherscan.io/address/${tokenData.creator}\r\nContract: https://etherscan.io/address/${address}#code\r\nCreated: ${contractAge || 'N/A'}`

  let bookmarkSavedTokenInfo = { address, name: tokenData.name, symbol: tokenData.symbol };


  return (
    <div className="p-4 max-w-md bg-white mx-auto rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex mb-4 justify-between">
        <CopySnippetButton text={textToCopy} html={htmlToCopy} />
        <BookmarkButton address={address} tokenInfo={bookmarkSavedTokenInfo} />
      </div>
      <div className="flex items-center mb-2">
        {statusBadges}
      </div>


      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        <li className="py-2 sm:py-3">
          <div className="flex items-center space-x-4 token-info">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                {tokenDisplayName}
              </p>
              <p className="text-sm text-gray-700 truncate dark:text-slate-400">
                Supply: {tokenData.supply || 'N/A'}
              </p>
              <p className="text-sm text-gray-700 truncate dark:text-slate-400">
                Decimals: {tokenData.decimals || 'N/A'}
              </p>
              <p className="text-sm text-gray-700 truncate dark:text-slate-400">
                Pre-Approvals: {tokenData.approves || 'N/A'}
              </p>
              <br />
              <p className="text-sm text-gray-700 truncate dark:text-slate-400">
                <a href={`https://etherscan.io/address/${tokenData.creator}`} target="_blank" rel="noreferrer" className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">
                  Deployer
                </a>
                {deployerInfoHtml}
                <br />
                <code>{tokenData.creator || 'N/A'}</code>
              </p>
              <p className="text-sm text-gray-700 truncate dark:text-slate-400">
                <a href={`https://etherscan.io/address/${address}#code`} target="_blank" rel="noreferrer" className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">
                  Contract
                </a>
                <br />
                <code>{address || 'N/A'}</code>
              </p>
              <br />
              {
                deployerAge ?
                  <p className="text-sm text-gray-700 truncate dark:text-slate-400">
                    Deployer Age: {deployerAge}
                  </p> : null
              }
              {
                contractAge ?
                  <p className="text-sm text-gray-700 truncate dark:text-slate-400">
                    Contract Age: {contractAge}
                  </p> : null
              }
              {
                elapsedTime ?
                  <p className="text-sm text-gray-700 truncate dark:text-slate-400">
                    Elapsed Time: {elapsedTime}
                  </p> : null
              }
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
export default TokenSnippet;
