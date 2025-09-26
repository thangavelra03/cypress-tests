Cypress.on('uncaught:exception', () => false);
describe('File Upload and Download',()=>{

    it('FileUpload - single file',()=>{
        cy.visit('https://qa-automation-practice.netlify.app/file-upload.html');
        cy.get('#file_upload').should('be.visible')
        .attachFile('sampleImage.png');
        cy.get('button[onclick="uploadFile()"]').click();
        cy.get('#file_upload_response').contains('sampleImage.png');
    } )

    it('FileUpload - mutiple files', ()=>{
        cy.visit('https://davidwalsh.name/demo/multiple-file-upload.php');
        cy.get('#filesToUpload').attachFile([
            'sampleImage.png',
            'sampleImage2.png'
        ]);
        cy.get('#fileList li').eq(0).contains("sampleImage.png");
        cy.get('#fileList li').eq(1).contains("sampleImage2.png");
    })

    it('File download', ()=>{

        cy.task('clearDownloads');
        cy.visit('https://demo.automationtesting.in/FileDownload.html');
        cy.contains('a.btn.btn-primary', 'Download' ).click();
        cy.readFile('cypress/downloads/samplefile.pdf',{timeout:15000})
        .should('exist')
        .and((content)=>{
            expect(content.length).to.be.greaterThan(100);
        })
    })
})