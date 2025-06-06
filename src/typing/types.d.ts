declare type Aria2Method =
  | 'aria2.addUri'
  | 'aria2.addTorrent'
  | 'aria2.getPeers'
  | 'aria2.addMetalink'
  | 'aria2.remove'
  | 'aria2.pause'
  | 'aria2.forcePause'
  | 'aria2.pauseAll'
  | 'aria2.forcePauseAll'
  | 'aria2.unpause'
  | 'aria2.unpauseAll'
  | 'aria2.forceRemove'
  | 'aria2.changePosition'
  | 'aria2.tellStatus'
  | 'aria2.getUris'
  | 'aria2.getFiles'
  | 'aria2.getServers'
  | 'aria2.tellActive'
  | 'aria2.tellWaiting'
  | 'aria2.tellStopped'
  | 'aria2.getOption'
  | 'aria2.changeUri'
  | 'aria2.changeOption'
  | 'aria2.getGlobalOption'
  | 'aria2.changeGlobalOption'
  | 'aria2.purgeDownloadResult'
  | 'aria2.removeDownloadResult'
  | 'aria2.getVersion'
  | 'aria2.getSessionInfo'
  | 'aria2.shutdown'
  | 'aria2.forceShutdown'
  | 'aria2.getGlobalStat'
  | 'aria2.saveSession'
  | 'system.multicall'
  | 'system.listMethods'
  | 'system.listNotifications'
