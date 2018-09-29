import * as json from '../res/data/blogs.json'
import Blog from '../constants/Blog'
import {getImgLoadPath, loadJSONFile} from '../constants/helpers'

export const LOAD_BLOGS = 'LOAD_BLOGS'
export function loadBlogs(){
  let blogMap = loadJSONFile(json, createBlog, 'title')
  return {blogs: blogMap, type: LOAD_BLOGS}
}

function createBlog(blogJSON){
  let imgPath = getImgLoadPath(blogJSON.imagename)
  let blog = new Blog({...blogJSON, image: imgPath})
  return blog
}
