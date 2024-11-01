import { getApiDocs } from "../../../lib/swagger";
import ReactSwagger from './react-swagger';

export default async function IndexPage() {
    const spec = await getApiDocs();
    return (
        <section 
            className="container" 
            style={{ backgroundColor: 'white', color: 'black' }}
        >
            <ReactSwagger spec={spec} />
        </section>
    );
}