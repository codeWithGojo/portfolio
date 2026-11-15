import { useParams } from 'react-router-dom';
import { projects } from '../projects';
import CaseStudy from './CaseStudy';
import NotFound from './NotFound';
export default function ProjectDetails(){const {slug}=useParams();const project=projects.find(p=>p.id===slug);return project?<CaseStudy project={project}/>:<NotFound/>}
