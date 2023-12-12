import { v4 as uuidv4 } from 'uuid';

const uuid = () => `s${uuidv4()}`;

export default uuid;