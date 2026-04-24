/**
 * Google Maps Integration Module.
 * Handles marker rendering and directions.
 */
export class VOTAMaps {
  private map: google.maps.Map | null = null;

  /**
   * Initializes the map centered on a location.
   * @param containerId DOM element ID.
   * @param lat Latitude.
   * @param lng Longitude.
   */
  public async initMap(containerId: string, lat: number, lng: number): Promise<void> {
    const element = document.getElementById(containerId);
    if (!element) return;

    this.map = new google.maps.Map(element, {
      center: { lat, lng },
      zoom: 14,
      styles: [], // Custom styles from Stitch would go here
    });
  }

  /**
   * Adds booth markers to the map.
   * @param booths Array of booth locations.
   */
  public addMarkers(booths: Array<{ name: string, location: { lat: number, lng: number } }>): void {
    if (!this.map) return;

    booths.forEach((booth) => {
      const marker = new google.maps.Marker({
        position: booth.location,
        map: this.map as google.maps.Map,
        title: booth.name,
      });
      return marker;
    });
  }

  /**
   * Generates a Google Maps directions deep link.
   */
  public getDirectionsLink(lat: number, lng: number): string {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`;
  }
}
