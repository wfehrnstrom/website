import {ProjectsFromJson, combineProjectAndImages} from '../constants/Project'

export const LOAD_PROJECTS = 'LOAD_PROJECTS'
export function loadProjects(jsonFile, imageMapping = null){
  let projects = ProjectsFromJson(jsonFile)
  if(imageMapping){
    projects.forEach(function(project, projectTitle){
      let projectImages = imageMapping.get(project.title)
      if(projectImages){
        projects.set(projectTitle, combineProjectAndImages(projectImages.authors, projectImages.projectImages, project))
      }
    })
  }
  return {type: LOAD_PROJECTS, projects: Array.from(projects.values())}
}
