import rhino3dmPromise from "rhino3dm";

class Rhino3dmImporter {
  async importContent(fileContent: ArrayBuffer): Promise<void> {
    const rhino3dm = await rhino3dmPromise;
    const rhinoDoc = rhino3dm.File3dm.fromByteArray(
      new Uint8Array(fileContent)
    );
    rhinoDoc.objects().forEach((obj) => {
      const rhinoGeometry = obj.geometry();
    });
    return;
  }
}
