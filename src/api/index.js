import qs from 'query-string'



export const DOMAIN = 'http://localhost:3001'


class ApiCall {
   constructor(domain) {
      this.domain = domain
   }

   async perform(url, data, config) {
      const request = await fetch(`${this.domain}/${url}`, {
         ...config,
         body: JSON.stringify(data),
         headers: {
            'Content-Type': 'application/json'
         }
      })
      return await request.json()
   }

   async get(path, searchParams = {}) {
      return await this.perform(`${path}?${qs.stringify(searchParams)}`)
   }
}


export default new ApiCall(DOMAIN)