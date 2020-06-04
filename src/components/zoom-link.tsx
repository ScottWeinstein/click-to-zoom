import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

export interface IZoomLinkProps {
  name: string;
  mid: string;
  pwd: string;
  domain?: string;
  className?: string;
}

const ZoomLink = (p: IZoomLinkProps) => {
  if (p.name == null) {
    throw new Error('name must not be empty: ' + JSON.stringify(p));
  }
  if (p.pwd == null) {
    throw new Error('pwd must not be empty: ' + JSON.stringify(p));
  }

  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          zoomDomain
        }
      }
    }
  `);

  const id = p.mid.replace(/-/g, '');
  const pwd = p.pwd.replace(/-/g, '');
  const meetingPostfix = p.mid.substring(p.mid.length - 5);
  const domain = p.domain || data.site.siteMetadata.zoomDomain;
  const iscustom = isNaN(Number(id));
  const zoomUrl = iscustom
    ? `https://goldmansachs.zoom.us/my/${id}?pwd=${pwd}`
    : `zoommtg://${domain}/join?confno=${id}?pwd=${pwd}`;
  const copyId = (e) => navigator.clipboard.writeText(id);
  const copyPwd = (e) => navigator.clipboard.writeText(pwd);
  return (
    <div className={p.className}>
      {iscustom ? (
        <>
          <a href={zoomUrl} onClick={copyPwd} target="_blank">
            {p.name}
          </a>
          <button onClick={copyId}>cpy id {id}</button>
          <button onClick={copyPwd}>cpy pwd {pwd}</button>
        </>
      ) : (
        <>
          <a href={zoomUrl} onClick={copyPwd}>
            {p.name}
          </a>

          <small>{meetingPostfix}</small>
        </>
      )}
    </div>
  );
};
export default ZoomLink;
