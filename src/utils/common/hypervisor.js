import * as R from 'ramda'
import { HYPERVISORS_MAP, EXTRA_HYPERVISORS } from '@/constants'
import { changeToArr } from '@/utils/utils'

class TypeClouds {
  hypervisorMap = {}
  brandMap = {}
  brandlowcaseMap = {}
  providerMap = {}
  providerlowcaseMap = {}
  hosttypeMap = {}
  constructor ({ ignore = [], env = ['idc', 'private', 'public'] } = {}) {
    this.ignore = ignore
    this.env = changeToArr(env)
    this.initMap()
  }
  initMap () {
    this.hypervisorMap = Object.assign({}, HYPERVISORS_MAP, EXTRA_HYPERVISORS)
    // 支持 hypervisor、brand、provider、host_type
    R.forEachObjIndexed((obj, key) => {
      if (this.env.includes(obj.env)) {
        const brandObj = { ...obj, key: obj.brand }
        const providerObj = { ...obj, key: obj.provider }
        const hosttypeObj = { ...obj, key: obj.host_type }
        this.brandMap[obj.brand] = brandObj
        this.brandlowcaseMap[obj.brand.toLowerCase()] = brandObj
        this.providerMap[obj.provider] = providerObj
        this.providerlowcaseMap[obj.provider.toLowerCase()] = providerObj
        this.hosttypeMap[obj.host_type] = hosttypeObj
      }
    }, this.hypervisorMap)
  }
  commonGet (map) {
    const currentMap = {}
    R.forEachObjIndexed((obj, key) => {
      if (!this.ignore.includes(key.toLowerCase())) {
        currentMap[key] = obj
      }
    }, map)
    return currentMap
  }
  getBrandlowcase () {
    return this.commonGet(this.brandlowcaseMap)
  }
  getProviderlowcase () {
    return this.commonGet(this.brandlowcaseMap)
  }
  getHypervisor () {
    return this.commonGet(this.hypervisorMap)
  }
  getProvider () {
    return this.commonGet(this.providerMap)
  }
  getBrand () {
    return this.commonGet(this.brandMap)
  }
  getHosttype () {
    return this.commonGet(this.hosttypeMap)
  }
}

export const typeClouds = new TypeClouds()
