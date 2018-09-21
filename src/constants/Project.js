import {PROJECT_TYPES} from './index'

function Project(author, title, repo, status, createdOn, finishedOn, logo, imgs, type=PROJECT_TYPES["CS"], urls=null){
  this.author = author
  this.title = title
  this.repo = repo
  this.status = status
  this.createdOn = createdOn
  this.logo = logo
  this.imgs = imgs
  this.type = type
  this.urls = urls
}

export default Project
