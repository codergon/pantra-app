function delay(milliseconds: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const formatIpfsLink = (url?: string) => {
  if (!url) return '';
  return url.includes('ipfs://')
    ? 'https://ipfs.io/ipfs/' + url.split('ipfs://')[1]
    : url;
};

export {delay, formatIpfsLink};
