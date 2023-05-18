package group119.group119;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin
@RestController
// @RequestMapping("/api")
public class PostsController {
    @Autowired
    private PostsRepository postsRepository;

    @GetMapping("/posts")
    public List<Posts> getPosts(){
        return postsRepository.findAll();
    }
    
    
    @GetMapping("/posts/{id}")
    public Posts getPosts(@PathVariable String id){
        return postsRepository.findById(id).orElse(null);
    }

    @PostMapping("/posts")
    public Posts  postMethodName(@RequestBody Posts posts){
        return postsRepository.save(posts);
    }

    @PutMapping("/posts")
    public Posts PutMapping(@RequestBody Posts newPosts){
        Posts oldPosts = postsRepository.findById(newPosts.getId()).orElse(null);
        oldPosts.setOwner(newPosts.getOwner());
        oldPosts.setContent1(newPosts.getContent1());
        oldPosts.setContent1(newPosts.getContent2());
        oldPosts.setContent1(newPosts.getContent3());
        oldPosts.setContent1(newPosts.getContent4());

        oldPosts.setCaption(newPosts.getCaption());
        postsRepository.save(oldPosts);
        return oldPosts;
    }

    @DeleteMapping("posts/{id}")
    public String DeletePosts(@PathVariable  String id){
        postsRepository.deleteById(id);
        return id;
    }

    
}
