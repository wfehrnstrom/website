import * as json from '../res/data/blogs.json'
import Blog from '../constants/Blog'
import {getImgLoadPath} from '../constants/helpers'

export const LOAD_BLOGS = 'LOAD_BLOGS'
export function loadBlogs(){
  let blogJSONArr = JSON.parse(JSON.stringify(json))
  let blogMap = new Map([])
  blogJSONArr.forEach(function(blogJSON){
    blogMap.set(blogJSON.title, createBlog(blogJSON))
  })

  return {blogs: blogMap, type: LOAD_BLOGS}
}

function createBlog(blogJSON){
  let imgPath = getImgLoadPath(blogJSON.imagename)
  let blog = new Blog({...blogJSON, image: imgPath})
  return blog
}
