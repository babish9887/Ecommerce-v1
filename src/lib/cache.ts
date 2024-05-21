import {unstable_cache as nextcache} from 'next/cache';
import {cache as reactCache} from 'react'

type Callback=(...args:any[])=>Promise<any>

export function cache<T extends Callback>(cb:T, keyParts:string[], options:{revalidate?:number | false; tags?:string[]}){
      return nextcache(reactCache(cb), keyParts,options)
}