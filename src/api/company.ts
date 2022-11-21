import axios from "axios"

async function login() {
  const payload = JSON.parse('{"username":"admin","password":"admin","captchaId":"","verifyCode":"","role":"inspec"}')
  return await axios.post("/v1/api/admin/base/open/login", payload)
}

/**
 * @param data
 */
export async function companyList(
  data: any = {
    page: 1,
    size: 3
  }
) {
  const list = await login()
  // console.log(list.data.data.token)
  const url = "/v1/api/admin/storeManage/cateringCompany/page"
  const companyList = await axios.post(url, data, {
    headers: {
      Authorization: list.data.data.token
    }
  })
  return companyList.data.data.list
}
