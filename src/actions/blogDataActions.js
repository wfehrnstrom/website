import * as json from '../res/data/blogs.json'
import Blog from '../constants/Blog'

const pathToImg = '../res/img/'

export const LOAD_BLOGS = 'LOAD_BLOGS'
export function loadBlogs(){
  let blogJSONArr = JSON.parse(JSON.stringify(json))
  let blogMap = new Map([])
  blogJSONArr.forEach(function(blogJSON){
    blogJSON.imagename = pathToImg + blogJSON.imagename
    let blog = new Blog(blogJSON)
    blogMap.set(blog.title, blog)
  })

  return {blogs: blogMap, type: LOAD_BLOGS}
}
