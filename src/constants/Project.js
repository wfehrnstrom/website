import {PROJECT_TYPES} from './index'
import {loadJSONFile} from './helpers'

function Project(authors, title, repo, status, createdOn, finishedOn, logo, imgs, summary, type=PROJECT_TYPES["CS"], urls=null){
  this.authors = authors
  this.title = title
  this.repo = repo
  this.status = status
  this.createdOn = createdOn
  this.finishedOn = finishedOn
  this.logo = logo
  this.imgs = imgs
  this.summary = summary
  this.type = type
  this.urls = urls
}

function ProjectsFromJson(authorImages, projectImages, jsonFile){
  return loadJSONFile(jsonFile, combineJSONAndImages.bind(this, authorImages, projectImages), 'title')
}

function combineJSONAndImages(authorImages, projectImages, jsonObj){
  let authors = null
  if(jsonObj.authors){
    jsonObj.authors = jsonObj.authors.map(function(author, index){
      return {name: author.name, img: authorImages[index]}
    })
  }
  return {imgs: projectImages, ...jsonObj}
}

export {Project, ProjectsFromJson}
