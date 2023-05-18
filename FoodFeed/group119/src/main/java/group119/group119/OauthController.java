package group119.group119;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.view.RedirectView;

import jakarta.servlet.http.HttpSession;

import java.util.Arrays;

@Controller
public class OauthController {
    @Value("${github.clientId}")
    private String clientId;
    @Value("${github.clientSecret}")
    private String clientSecret;
    @Value("${github.redirectUri}")
    private String redirectUri;

    @GetMapping("/login/github")
    public RedirectView loginWithGithub() {
        String authorizationUrl = "https://github.com/login/oauth/authorize" +
                "?client_id=" + clientId +
                "&redirect_uri=" + redirectUri;
        return new RedirectView(authorizationUrl);
    }

    @GetMapping("/login/github/callback")
    public RedirectView githubCallback(@RequestParam("code") String code, HttpSession session) {
        String accessTokenUrl = "https://github.com/login/oauth/access_token" +
                "?client_id=" + clientId +
                "&client_secret=" + clientSecret +
                "&code=" + code;
    
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
    
        ResponseEntity<String> response = restTemplate.exchange(accessTokenUrl, HttpMethod.POST, entity, String.class);
        String accessToken = response.getBody().split("&")[0].split("=")[1];
    
        String userProfileUrl = "https://api.github.com/user";
        headers.setBearerAuth(accessToken);
        entity = new HttpEntity<>("parameters", headers);
    
        GitHubUser user = restTemplate.getForObject(userProfileUrl, GitHubUser.class, entity);
    
        session.setAttribute("githubUser", user);
        session.setAttribute("name", user.getName());
        session.setAttribute("profilePic", user.getProfilePic());
    
      
    String message = "Logged in as " + user.getLogin();
    // Trigger an alert to display the message
    String script = "<script>alert('" + message + "');</script>";
    return new RedirectView("/?message=" + message + script);
    }

//     @GetMapping("/profile")
//     public String prof(HttpSession session) {
//     String name = (String) session.getAttribute("name");
//     String profilePic = (String) session.getAttribute("profilePic");

//     // ... return the page with the name and profile picture ...
//     return userRepository.save(prof(session));
// }
}
