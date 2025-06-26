# Settings API Documentation

## Endpoint: `GET /dashboard/get-settings`

This endpoint provides configuration data for the application, including banner content and contact information.

### Expected Response Structure

```json
{
  "success": true,
  "data": {
    "banner": {
      "title": "Support doesn't end with a claim",
      "subtitle": "empathy.",
      "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo.",
      "image": "https://example.com/banner-image.png"
    },
    "contact": {
      "phone": "470-601-1911",
      "email": "contact@example.com"
    }
  }
}
```

### Banner Object Properties

- `title` (string): Main heading text for the banner
- `subtitle` (string): Subtitle text displayed next to the logo
- `description` (string): Descriptive text below the main heading
- `image` (string): URL to the banner image

### Contact Object Properties

- `phone` (string): Contact phone number
- `email` (string): Contact email address

### Error Response

```json
{
  "success": false,
  "message": "Error message here",
  "errors": {
    "field_name": ["Validation error message"]
  }
}
```

## Implementation Details

### Custom Hook: `useGetSettings`

```javascript
import { useGetData } from "./useGetData";

export const useGetSettings = (enabled = true) => {
  return useGetData({
    endpoint: "dashboard/get-settings",
    queryKey: ["settings"],
    enabledKey: enabled,
  });
};
```

### Settings Context: `SettingsContext`

The application uses React Context to share settings data across components, avoiding multiple API calls:

```javascript
import { useSettings } from "../context/SettingsContext";

function MyComponent() {
  const { banner, contact, isLoading, error } = useSettings();

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorComponent />;

  return (
    <div>
      <h1>{banner.title}</h1>
      <p>{contact.phone}</p>
    </div>
  );
}
```

### Loading States

Both Banner and ContactSection components include loading skeletons that display while data is being fetched:

- `BannerSkeleton`: Shows placeholder content for banner layout
- `ContactSectionSkeleton`: Shows placeholder content for contact form layout

### Fallback Values

If the API doesn't return data or returns partial data, the components use fallback values:

- Banner title: "Support doesn't end with a claim"
- Banner subtitle: "empathy."
- Contact phone: "470-601-1911"
- Contact email: "Pagedone1234@gmail.com"
